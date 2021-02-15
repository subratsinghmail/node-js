const crypto=require('crypto');



const secret='donttellanyone';


function check(){
 
    try{

        const hash=crypto.randomBytes(64).toString('hex')
        console.log(hash())
        }catch(err){
          console.log('cant hash')
        }
}
check()


