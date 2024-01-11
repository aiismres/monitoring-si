import React, { useRef, useState } from 'react';
import styles from './texteditor.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import JoditEditor from 'jodit-react';

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'color',
  'image',
  'background',
  'align',
  'size',
  'font',
];

const modules = {
  toolbar: [
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', /*'italic', */ 'underline', 'strike'],
    [{ size: [] }],
    // [{ font: [] }],
    [{ align: ['right', 'center', 'justify'] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    [{ color: ['red', 'green', 'blue', '#785412'] }],
    [{ background: ['red', 'yellow', '#785412'] }],
  ],
};

export function TextEditor() {
  const [convertedText, setConvertedText] = useState('Some default content');

  const editor = useRef(null);
  const [content, setContent] = useState('Start writing');
  const config = {
    readonly: false,
    height: 400,
  };
  // @ts-ignore
  const handleUpdate = (event) => {
    const editorContent = event.target.innerHTML;
    setContent(editorContent);
  };

  return (
    <>
      <h2>TextEditor</h2>
      <ReactQuill
        theme="snow"
        value={convertedText}
        onChange={setConvertedText}
        // style={{ minHeight: '300px' }}
        formats={formats}
        modules={modules}
        // modules={{ toolbar: false }}
        // readOnly={true}
      />
      <h3>readOnly</h3>
      <ReactQuill
        theme="snow"
        value={convertedText}
        onChange={setConvertedText}
        // style={{ minHeight: '300px' }}
        formats={formats}
        modules={{ toolbar: false }}
        readOnly={true}
      />
      <h1>React Editors</h1>
      <h2>Start editing to see some magic happen!</h2>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={handleUpdate}
        onChange={(newContent) => {}}
      />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}
