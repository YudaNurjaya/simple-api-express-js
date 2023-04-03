const response = (statuscode,data,message,res) => {
    res.json(statuscode,[
        {
            payload: data,
            message,
            metadata:{
                prev: "",
                next: "",
                current: "",
            },
        },
    ])
}

module.exports = response