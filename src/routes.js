
app.post('/users', (req,res)=> {
    console.log(req.body)
    return res.json(req.body)
    
})

app.get('/',(req,res)=> {
    return res.json({
        msg: "Hello Lázaro P"
    })
})
