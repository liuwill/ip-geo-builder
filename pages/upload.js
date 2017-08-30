export default () => (
  <div>
    <form method='post' encType='multipart/form-data' action='/api/upload.do'>
      <input type='text' name='username' />
      <input type='password' name='password' />
      <input type='file' name='thumbnail' />
      <input type='submit' />
    </form>
  </div>
)
