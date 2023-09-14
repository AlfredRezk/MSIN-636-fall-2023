const fs= require('fs')

const routes  =(req, res) => {
    const { url, method } = req;
  
      // GET http://localhost:8080/add 
    if (url === "/add" && method === "GET") {
      res.setHeader('Content-Type', 'text/html')
      res.write(`
          <form action='/add' method='POST'>
          <input type="text" placeholder="Enter a note" name="message"/>
          <button> ADD</button>
          </form>
          `);
      return res.end()
    }
  
  
    // post http://localhost:8080/add  
    if(url==='/add'&&method==='POST'){
      let body = '';  
      // Keep adding data chunk to the request body 
      req.on('data', (chunk)=> body+=chunk);
      req.on('end', ()=>{
      const [, note]= body.split('=')
      // First create a file with data the user entere 
      fs.writeFileSync('notes.txt', note)
  
      })
  
      // redirect the user to home page
      res.statusCode = 302   //redirect 
      res.setHeader('Location', '/')
      return res.end()
  
    }
  
    if(url==='/'&&method ==='GET'){
      res.write('<h1> Home Page 3</h1>')
      return res.end()
    }
  
    res.statusCode = 404 
    res.write('<h1> 404 : page not found </h1>')
    res.end()
  }

  module.exports = routes