<script>
  let file;

  async function uploadFile() {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('File uploaded successfully!');
      } else {
        alert('Failed to upload the file.');
      }
    } catch (error) {
      alert('Error uploading file: ' + error);
    }
  }
</script>

<div class="header">
  <h2>FinTrust</h2>
</div>

<div class="container">
  <h1>Secure Loan Upload</h1>

  <p>Upload your financial documents securely using our file upload system.</p>

  <form on:submit|preventDefault={uploadFile}>
    <div class="form-group">
      <input type="file" id="file" on:change={(e) => file = e.target.files[0]} />
      <label for="file">Choose file</label>
    </div>

    <div class="form-group">
      <button type="submit">Upload File</button>
    </div>
  </form>

    <!-- Navigation Links -->
    <div class="nav-links">
      <a href="/">Upload Loan</a> | 
      <a href="/addreg">Add Reg</a> | 
      <a href="/processedloan">Loan Processing</a>
    </div>
  
</div>

<style>
  .header {
    text-align: center;
  }

  .container {
    margin: 0 auto;
    padding: 20px;
    max-width: 600px;
  }

  .nav-links {
    margin-top: 20px;
    text-align: center;
  }
</style>