export default () => (
  <div className='mock-form'>
    <form method='post' encType='multipart/form-data' target='__blank' action='/api/upload.do'>
      <input type='text' name='filename' />
      <input type='file' name='core' />
      <input type='file' name='geo' />
      <input type='submit' />
    </form>

    <style>{`
      .mock-form {
        text-align: center;
      }

      .mock-form form {
        width: 640px;
        height: 480px;

        margin: auto;
        margin-top: 20px;
        background-color: #fff;
        border: 1px solid #edf0f2;
        border-radius: 2px;
        box-shadow: 0 2px 6px rgba(0,0,0,.07);

        padding: 20px;
      }

      .mock-form input {
        display: block;
        margin-bottom: 20px;
      }
    `}</style>
  </div>
)
