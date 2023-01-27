const express = require("express")
const router = express.Router() 
const BlogModel=require('../../models/blog')
const verify= require('../../middlewares/authenticate')



// Routes Related Blog


// Getting 10 blogs of nth page


router.get('/all', async (req, res) => { 
     
    try{
        const count=req.query.page-1;
        const allBlogs=await BlogModel.find({});
        const blogsCount=allBlogs?.length;
        const startIndex=count*10;
        const endIndex=startIndex+10;
        const requiredBlogs=allBlogs.slice(startIndex,endIndex);

        res.send({blogs:requiredBlogs,status:'200',message:'Blogs Found'});
   }catch (error) { 
        console.log(error)
        res.send({status:'404',message:'Something wrong with blog data.'});

   }
})


// add new blog 


 
router.post('/add',verify, async (req, res) => { 
     
    try{
        const blogData=req.body;
        const result= await BlogModel.create(blogData);
        res.send( {status:'200',message:'Blog added.'} );
   }catch (error) { 
        console.log(error)
        res.send({status:'404',message:'Something wrong with blog data.'});

   }
})
 

// update blog

router.post('/update',verify, async (req, res) => { 
     
    try{
        const blogData=req.body;
        const result= await BlogModel.findOneAndUpdate({_id:blogData.id},{
            blogTitle: blogData.blogTitle,
            blogCategory:blogData.blogCategory,
            blogDescription:blogData.blogDescription,
            blogAddedByUser:blogData.blogAddedByUser,
            blogAddedByUserEmail:blogData.blogAddedByUserEmail,
        });
        res.send( {blog:result,status:'200',message:'Blog Updated.'} );
   }catch (error) { 
        console.log(error)
        res.send({status:'404',message:'Something wrong with blog data.'});

   }
})



// delete blog


router.post('/delete',verify, async (req, res) => { 
     
    try{
        const blogData=req.body;
        const result= await BlogModel.findOneAndDelete({_id:blogData.id});
        if(result!=null){
           res.send( {blog:result,status:'200',message:'Blog Deleted.'} );
        }else{
            res.send( { status:'404',message:'No Blog found to delete.'} );
        }
   }catch (error) { 
        console.log(error)
        res.send({status:'404',message:'Something wrong with blog data.'});

   }
})




module.exports = router