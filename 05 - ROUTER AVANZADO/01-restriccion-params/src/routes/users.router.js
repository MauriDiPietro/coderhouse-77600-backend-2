import { Router } from "express";
const router = Router();

// router.get('/:email', (req, res)=>{
//     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
//     const { email } = req.params
//     if(email.match(emailRegex)){
//     // emailRegex.test(email)
//         //controller->repository-> dao->db
//         return res.send('email valido')
//     }
//     return res.status(400).send('email INVALIDO')
// });

// router.get('/:email([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})', (req, res)=>{
//     // emailRegex.test(email)
//         //controller->repository-> dao->db
//         return res.send('email valido')
// });

router.get("/:email", (req, res) => {
  // emailRegex.test(email)
  //controller->repository-> dao->db
  return res.send("email valido");
});

router.param("email", (req, res, next, email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const isValid = email.match(emailRegex);
  if (!isValid) return res.status(400).send("email invalido");
  return next();
});

// router.get('*', (req, res)=>{
//     res.send('error')
// });

export default router;
