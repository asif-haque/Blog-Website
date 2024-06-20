import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Controller } from "react-hook-form";

// to take control of the Editor field, Controller component of react hook form is used. forwardRef could be used

export default function RTE({
  label,
  name,
  control,
  defaultValue = "",
  classnames = "",
}) {
  return (
    <div className={`w-full ${classnames}`}>
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || `content`}
        control={control} // this gives access of the form states to the parent
        // render is a function that returns a React element [need more knowledge on this]
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="hs5mvzzy8jllsrsxtm60k30789kvfou3f5uxo8zw51ddgp05"
            initialValue={defaultValue} // for editing a post
            init={{
              branding: false,
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
