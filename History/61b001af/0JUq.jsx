// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import Editor from '../Editor';

// export default function CreatePost() {
//   const [title, setTitle] = useState('');
//   const [summary, setSummary] = useState('');
//   const [content, setContent] = useState('');
//   const [files, setFiles] = useState('');
//   const [redirect, setRedirect] = useState(false);
//   async function createNewPost(e) {
//     const data = new FormData();
//     data.set('title', title);
//     data.set('summary', summary);
//     data.set('content', content);
//     data.set('file', files[0]);
//     e.preventDefault();
//     const response = await fetch('http://localhost:4000/post', {
//       method: 'POST',
//       body: data,
//       credentials: 'include',
//     });
//     if (response.ok) {
//       setRedirect(true);
//     }
//   }

//   if (redirect) {
//     return <Navigate to={'/'} />;
//   }
//   return (
//     <form onSubmit={createNewPost}>
//       <input
//         type="title"
//         placeholder={'Title'}
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <input
//         type="summary"
//         placeholder={'Summary'}
//         value={summary}
//         onChange={(e) => setSummary(e.target.value)}
//       />
//       <input type="file" onChange={(e) => setFiles(e.target.files)} />
//       <Editor value={content} onChange={setContent} />
//       <button style={{ marginTop: '5px' }}>Create post</button>
//     </form>
//   );
// }

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    data.append('file', files[0]);

    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-5 bg-slate-300 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Buat Artikel Baru</h2>
      <form onSubmit={createNewPost}>
        <br />
        <div className="flex justify-between">
          <div>
            <label className="block mb-1">Judul Artikel</label>
            <input
              className="bg-blue-100"
              type="text"
              placeholder={'Title'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Cover Artikel</label>
            <input type="file" onChange={(e) => setFiles(e.target.files)} />
          </div>
        </div>
        <br />
        <div className="mb-4">
          <label className="block mb-1">Ringkasan Artikel</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            value={summary}
            rows="6"
            onChange={(e) => setSummary(e.target.value)}
            required
          />
          {/* <textarea
            className="w-full px-3 py-2 border rounded"
            value={summary}
            rows="10"
            onChange={(e) => setSummary(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setSummary((prevSummary) => prevSummary + '\n');
              }
            }}
            required
          /> */}
        </div>
        <div>
          <label className="block mb-1">Isi Artikel</label>
          <Editor value={content} onChange={(value) => setContent(value)} />
        </div>

        <br />
        <button>
          <a
            href="#_"
            class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
          >
            <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
            <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              Button Text
            </span>
          </a>
        </button>

        {/* hmmm */}
      </form>
    </div>
  );
}
