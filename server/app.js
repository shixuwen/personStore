let express = require('./node_modules/express')
const bodyParser = require('body-parser')
let app = express()
app.use(bodyParser.json()) // json请求
app.use(bodyParser.urlencoded({extended: false})) //表单请求
let login = true
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  if (!login) return res.json('未登录')
  next()
})

let question = [
  {
    data:213,
    num:444,
    age:12
  },
  {
    data:456,
    num:678,
    age:13
  }
]

app.get('/123', (req, res) => {
  res.status(200)
  res.json(question)
})
app.get('/gethtml', (req, res) => {
  res.status(200)
  res.send('<div style="color: red">hello world</div>')
})
app.post('/getQusetion',(req, res) => {
  res.status(200)
  res.json(question)
})
app.post('/getQ/:data', (req, res) => {
  console.log('req.body', req.body)
  if (req.body.question === "查询问题") {
    res.status(200)
    res.json(question)
  }
})
let server = app.listen(3000, function() {
  let host = server.address().address
  let port = server.address().port
  console.log(host, port)
})