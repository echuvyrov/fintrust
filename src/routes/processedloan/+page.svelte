<script>
    export let data;
  </script>
  
  <svelte:head>
    <title>FinTrust: Trust Us</title>
  </svelte:head>
  
  <div class="header">
    <h2>FinTrust</h2>
  </div>
  
  <div class="container">
    <h1>Financial Regulations</h1>
    <p>Regulations that are relevant to this loan</p>
  
    {#if data && data.content}
      <div class="file-content">
        {data.content.regs}
      </div>
    {/if}
  
    <h1>Extracted Data</h1>
    <p>Values to pass onto the loan decision ML workflows</p>
  
    {#if data && data.content}
      <div class="file-content">
        {data.content.parsedValues}
      </div>
    {/if}

    <!-- Navigation Links -->
    <div class="nav-links">
      <a href="/">Upload Loan</a> | 
      <a href="/addreg">Add Reg</a> | 
      <a href="/processedloan">Processed Loans</a>
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
  
    .file-content {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 5px;
      border: 1px solid #ddd;
      white-space: pre-wrap; /* Keeps line breaks but allows text to wrap */
      word-wrap: break-word; /* Breaks long words to fit in the container */
      line-height: 1.6; /* Improves readability */
      font-family: 'Courier New', Courier, monospace; /* Optional, for a code-like look */
      font-size: 14px; /* Slightly larger font for readability */
    }
  
    .nav-links {
      margin-top: 20px;
      text-align: center;
    }
  </style>
  