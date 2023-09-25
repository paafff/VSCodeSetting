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
    <div className="max-w-4xl mx-auto p-5 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Buat Artikel Baru</h2>
      <form onSubmit={createNewPost}>
        <br/>
        <div className='flex justify-between'>
          <input
            className="bg-blue-100"
            type="text"
            placeholder={'Title'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input type="file" onChange={(e) => setFiles(e.target.files)} />
        </div>
        <br />
        <input
          className="bg-blue-100"
          type="text"
          placeholder={'Summary'}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <Editor value={content} onChange={(value) => setContent(value)} />
        <button style={{ marginTop: '5px' }}>Create postsssss</button>
      </form>
    </div>
  );
}
