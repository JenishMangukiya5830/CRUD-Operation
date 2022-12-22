const model = require('../Model/AdminModel')
const fs = require('fs');
const path = require('path');

module.exports.get = (req,res) => {
    res.render('index');
}

module.exports.insert = (req,res) => {
    console.log(req.body);

    model.uploadimg(req,res,(err) => {
        console.log(req.file);
        if(err){
            req.flash('error','File not Upload')
        }

        let avatar = ''

        if(req.file){
            avatar = model.avatar_path + '/' + req.file.filename;
        }

        if(req.body.grid != '')
        {
            if(req.body.name != '')
            {
                if(req.body.email != '')
                {
                    if(req.body.password != '')
                    {
                        if(req.body.password.length >= 6)
                        {
                            if(req.body.phone != '')
                            {
                                if(req.body.phone.length >= 10 && req.body.phone.length <= 10)
                                {
                                    if(req.body.course)
                                    {
                                        if(req.body.fees != '')
                                        {
                                            if(avatar != '')
                                            {
                                                model.create({
                                                    grid : req.body.grid,
                                                    name : req.body.name,
                                                    email : req.body.email,
                                                    password : req.body.password,
                                                    phone : req.body.phone,
                                                    course : req.body.course,
                                                    fees : req.body.fees,
                                                    avatar : avatar
                                                },(err,data) => {
                                                    if(err)
                                                    {
                                                        console.log('Data not Inserted');
                                                        req.flash('error','Data not inserted')
                                                        res.redirect('back');
                                                        return false
                                                    }
                                                    console.log('Data Inserted');
                                                    req.flash('success','Data inserted')
                                                    res.redirect('back');
                                                })
                                            }
                                            else{
                                                req.flash('error','Please Upload Image')
                                                res.redirect('back')
                                            }
                                        }
                                        else{
                                            req.flash('error',"Please Fill Fess Feild")
                                            res.redirect('back')
                                        }
                                    }
                                    else{
                                        req.flash('error','Please Select Course')
                                        res.redirect('back')
                                    }
                                }
                                else{
                                    req.flash('error','Please Enter 10 Digit Mobile No.')
                                    res.redirect('back')
                                }
                            }
                            else{
                                req.flash('error',"Please Fill Mobile No. Field")
                                res.redirect('back')
                            }
                        }   
                        else{
                            req.flash("error","Please Enter Mminimum 6 Letter")
                            res.redirect('back')
                        }
                    }
                    else{
                        req.flash('error',"Please Fill Password Field")
                        res.redirect('back');
                    }
                }
                else{
                    req.flash('error',"Please Fill Email Feild")
                    res.redirect('back')
                }
            }
            else{
                req.flash('error',"Please Fill Name Field")
                res.redirect('back')
            }
        }
        else{
            req.flash('error',"Please Fill Grid Field");
            res.redirect('back')
        }
    })
}

module.exports.data = (req,res) => {
    res.redirect('/viewData')
}

module.exports.view = (req,res) => {
    model.find({},(err,data) => {
        if(err)
        {
            req.flash('error','Data not Found');
        }
        
        return res.render('view',{
            data : data
        })
    })
}

module.exports.back = (req,res) => {
    res.redirect('/')
}

module.exports.delet = (req,res) => {

    model.findByIdAndDelete(req.params.id,(err,data) => {
        if(err)
        {
            req.flash('error','Data not Deleted');
        }

        if(data.avatar)
        {
            fs.unlinkSync(path.join(__dirname,'../',data.avatar))
        }
        else{
            req.flash('error','FIle not Found')
        }

        req.flash('success','Data Successfully Deleted')
        res.redirect('back')
    })

}

module.exports.edit = (req,res) => {

    model.findById(req.params.id,(err,data) => {
        if(err)
        {
            req.flash('error','data not Found');
            return false;
        }

        return res.render('edit',{
            record : data
        })
    })

}

module.exports.update = (req,res) => {

    model.uploadimg(req,res,(err) => {
        if(err)
        {
            req.flash('error','File not Uploaded')
        }

        model.findById(req.body.edit_id,(err,data) => {
            if(err)
            {
                req.flash('error','Data not Found')
            }

            if(req.file)
            {
                if(data.avatar)
                {
                    fs.unlinkSync(path.join(__dirname,'../',data.avatar))
                }

                let avatar = model.avatar_path + '/' + req.file.filename;

                model.findByIdAndUpdate(req.body.edit_id,{
                    grid : req.body.grid,
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    phone : req.body.phone,
                    course : req.body.course,
                    fees : req.body.fees,
                    avatar : avatar
                },(err,data) => {
                    if(err)
                    {
                        req.flash('error','Data not Updated')
                    }
                    console.log(data);
                    req.flash('success','Data Updated')
                    return res.redirect('/')
                })

            }
            else{
                model.findByIdAndUpdate(req.body.edit_id,{
                    grid : req.body.grid,
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    phone : req.body.phone,
                    course : req.body.course,
                    fees : req.body.fees
                },(err,data) => {
                    if(err)
                    {
                        req.flash('error','Data not Updated')
                    }
                    req.flash('success','Data Updated')
                    return res.redirect('/')
                })
            }
        })
       
    })

    
}