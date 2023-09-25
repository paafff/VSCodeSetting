import React from 'react'

function RegisterForm() {
    return (
        <>

      <div className="max-w-4xl mx-auto p-5 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Buat Artikel Baru</h2>
        <form onSubmit={articleCreate}>
          <div className="mb-4">
            <label className="block mb-1">Judul Artikel</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Konten Artikel</label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              value={content}
              rows="40"
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Ringkasan Artikel</label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              value={summary}
              rows="10"
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>

          {/* upload gambar */}
          <div className="mb-4">
            <label className="block mb-1">Gambar Artikel </label>

            <input
              type="file"
              className="w-full"
              name="imgFilesOne"
              accept="image/*"
              // onChange={handleFileChangeOne}
              onChange={(e) => {
                setImgFilesOne(
                  e.target.files.length > 0 ? e.target.files[0] : ppSaya
                );
              }}
              // required
            />
            <input
              type="file"
              className="w-full"
              accept="image/*"
              onChange={(e) => {
                setImgFilesTwo(
                  e.target.files.length > 0 ? e.target.files[0] : ppSaya
                );
              }}
              // required
            />
            <input
              type="file"
              className="w-full"
              accept="image/*"
              onChange={(e) => {
                setImgFilesThree(
                  e.target.files.length > 0 ? e.target.files[0] : ppSaya
                );
              }}
              // required
            />
          </div>
          {/* upload gambar */}

          {/* upload gambar */}
          {/* <div className="mb-4">
            <label className="block mb-1">Gambar Artikel </label>
            {imgFiles.map((imgFile, index) => (
              <input
                key={index}
                type="file"
                className="w-full"
                accept="image/*"
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            ))}
          </div> */}
          {/* upload gambar */}

          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Buat Artikel
          </button>
        </form>
      </div>
    </>
}

export default RegisterForm