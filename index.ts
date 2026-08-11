import express from "express";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bcrypt from "bcryptjs";
import prisma from "./lib/prisma";
import OrganizationRoute from "./api/Organization/OrganizationRoute"
import userRouter from "./api/User/userRouter"
import orderRoute from "./api/Order/orderRoute"
import foodRouter from "./api/Food/food.router"

const app = express();
const port = 8080;

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
console.log(OrganizationRoute)
app.use("/Organization", OrganizationRoute)
app.use("/user", userRouter)
app.use("/order", orderRoute)
app.use("/food", foodRouter)


app.get("/", (req : any, res: any) => {
  res.send("Hello World!");
});




// Organization route




//create new user
   
// app.post("/createUser", async (req, res) => {
//   try {

//     const {email, password, name} = req.body;
    
//     if(!email || !password || !name) {
//       return res.status(400).json({
//         message : "Required form is missing"
//       })
//     }
    
//     const hash = bcrypt.hashSync(password, 10)
    
//     // for 2FA
//     const randNum = Math.floor(Math.random() * 10000)

//     const newUser = await prisma.user.create({
//       data : {
//         email,
//         password : hash,
//         name : name
//       }
//     })




//     const response = res.status(200).json({
//       message : "Succes creating new user"
//     })
    
//     return res.status(200).json({
//       message : "Success creating User"
//     })

//   } catch (error) {

//     return res.status(500).json({
//       message: "Internal server error",
//       error: error
//     });
//   } 
// })


//create login employee
// app.post("/login", async (req, res) => {
//     try {

//       const {username, userpassword} = req.body;

//       if(!username || !userpassword) {
//        return res.status(400).json({
//         message : "Required form is missing"
//       })
//       }

//       const findUser = await prisma.user.findFirst({
//         where : {name : username}
//       })

//       if(!findUser) {
//         return res.status(404).json({
//           message : "Cant find user"
//         })
//       }
      
//       const isPaswordMatch = await bcrypt.compare(userpassword, findUser.password)

//       if(isPaswordMatch) {
//         return res.status(200).json({
//           message : "Login success"
//         })
//       }

//       else {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     } catch (error) {
//       console.log(error)
//       return res.status(500).json({
//       message: "Internal server error",
//     });
//     }
// } )


//create food input
app.post("/foodinput", async (req, res) => {
  try {

    const data = req.body;

    if(!Array.isArray(data) || data.length == 0) {
      return res.status(400).json({
        message : "Input must be array"
      })
    }
    
    // const {name, description, category, price} = req.body
    
    // if(!name || !description || !category || !price) {
    //   return res.status(401).json({
    //     message : "Invalid input"
    //   })
    // }

    const createFoodMenu = await prisma.food.createMany({
      data : data
    })

    return res.status(200).json({
      message : `Success add food to database ${createFoodMenu}`
    })


  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message : "Internal server error"
    })
  }
})


app.get("/home", (req : any, res : any) => {


  const password = "verylong password"
  const hash = bcrypt.hashSync(password, 10)
  const randNum = Math.floor(Math.random() * 10000)

  res.send(randNum);


})



app.get("/welcome", (req : any, res : any) => {
  res.send("welcome to paradise")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});