// form to create a post OR edit an existing post
// featuredImg
import Input from "../Input";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import RTE from "../RTE";
import Select from "../Select";
import Button from "../Button";
import { appWriteService } from "../../appwrite/appwriteService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const message = "Required Field!";

export default function PostForm({ post }) {
  const { register, setValue, watch, control, getValues, handleSubmit } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "", // i thought there is a prop called slug for a post
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const slugFunction = (value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
        .concat(`-${crypto.randomUUID().split("-")[0]}`);
    }
    return "";
  };

  //   watch the title field to produce slug value. And to not make any rerender while watching,
  //   callback version of watch will be used.
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      // if name condition is not given, error :: RangeError: Maximum call stack size exceeded
      if (name === "title") {
        setValue("slug", slugFunction(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const submit = async (data) => {
    try {
      if (!post) {
        // upload image to storage
        const file = data.image[0]
          ? await appWriteService.uploadFile(data.image[0])
          : null;
        // create post with the form data
        const dbPost = await appWriteService.createPost({
          ...data,
          featuredImg: file ? file.$id : undefined,
          userId: userData.$id,
          userName: userData.name,
          status: data.status === "active" ? true : false,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
          toast.success("Post added.");
        }
      } else {
        // Edit Form
        // upload new image
        const file = data.image[0]
          ? await appWriteService.uploadFile(data.image[0])
          : null;
        // delete old image if there's a new image
        if (file && post.featuredImg) {
          await appWriteService.deleteTheFile(post.featuredImg);
        }
        // update post
        const dbPost = await appWriteService.updatePost(post.$id, {
          ...data,
          featuredImg: file ? file.$id : undefined,
          status: data.status === "active" ? true : false,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
          toast.success("Post edited.");
        }
      }
    } catch (err) {
      console.log("Error in creating or updating post", err);
      toast(err.message);
    }
  };

  return (
    <div className="pb-[10vh]">
      <form onSubmit={handleSubmit(submit)} className="md:flex flex-wrap">
        <div className="md:w-2/3 px-3">
          <Input
            label="Title"
            placeholder="Title"
            className="mb-4"
            {...register("title", {
              required: { value: true, message },
            })}
          />

          <Input
            label="Slug"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", {
              required: { value: true, message },
            })}
            // we'll set the slug value programatically in 2 ways:
            // 1. from the title (removing spaces)
            // 2. on writing in this input field, removing spaces (kindof like github repo name)
            onInput={(e) =>
              setValue("slug", slugFunction(e.target.value), {
                shouldValidate: true,
              })
            }
          />

          <RTE
            label="Content"
            name="content"
            control={control} // there's no register, so we're using control
            // defaultValue={post?.content || ""} could use this
            defaultValue={getValues("content")}
            classnames="mb-4 md:m-0"
          />
        </div>
        <div className="md:w-1/3 px-3">
          {/* image */}
          <Input
            label="Featured Image"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image")}
          />
          {/* display image if there is one, while editing */}
          {post?.featuredImg && (
            <div className="w-full mb-4">
              <img
                src={appWriteService.getTheFilePreview(post.featuredImg)}
                alt="Featured Image"
                className="rounded-lg"
              />
            </div>
          )}
          {/* active status */}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: { value: true, message } })}
          />
          {/* <Input /> to add topics */}
          {/* submit button */}
          <Button type="submit" className="w-full">
            {post ? `Update` : `Submit`}
          </Button>
        </div>
      </form>
    </div>
  );
}
