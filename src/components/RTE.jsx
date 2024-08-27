import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({ name, control, label, defaultvalue = "", className = "" }) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="inline-block mb-1 pl-1  font-semibold ">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        // onChange- is extracted from field. This method is responsible for updating the form state whenever the content in the editor changes.
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="0gob5nbki446edfaox3jfe5auyowse9glk56f0tb2x2uws47"
            initialValue={defaultvalue}
            init={{
              initialValue: defaultvalue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
            // onEditorChange: This is the crucial part where the onChange function is passed to onEditorChange. Whenever the user types or changes something in the editor, onEditorChange triggers onChange, which updates the form's state.
          />
        )}
      />
    </div>
  );
}

export default RTE;
