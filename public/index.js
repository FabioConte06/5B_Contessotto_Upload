(async () => {
  const inputFile = document.querySelector('#file');
  const button = document.querySelector("#button");
  const link = document.querySelector("#link");
  const fileList = document.querySelector("#fileList");

  const loadFileList = () => {
    fetch("/filelist")
      .then(res => res.json())
      .then(files => {
        fileList.innerHTML = files.map(file => `
          <li>
            <a href="${file}" target="_blank">${file}</a>
          </li>
        `).join('');
      })
      .catch(e => console.log(e));
  };

  const handleSubmit = (event) => {
    const formData = new FormData();
    formData.append("file", inputFile.files[0]);
    const fetchOptions = {
      method: 'post',
      body: formData
    };
    
    fetch("/upload", fetchOptions)
      .then(res => res.json())
      .then(data => {
        link.setAttribute("href", data.url);
        link.innerText = data.url;
        loadFileList();
      })
      .catch(e => console.log(e));
  };

  button.onclick = handleSubmit;
  loadFileList();
})();