<h1>A Back-end draw webapp made by nodeJS<h1/>

TABLE OF CONTENT:
<br/>
1. [Tech stack](#tech-stack)
2. [How to install?](#how-to-install)
3. [Primary features](#primary-features)

## Tech stack: <a name="tech-stack"></a>
 - Framework: Express.js
 - Programing language: TypeScript 
 - SQL: MySQL 
 - NoSQL: Redis
 - Testing: Mocha & Chai
 - Other library: Socket.io, Sequelize, JWT, CORS,...

## How to install? <a name="how-to-install"></a>
install:
```
  npm install
```

test:
```
  npm test
```

run:
```
  npm start
```
## Primary features <a name="primary-features"></a>
- Single device login (Block user login/working on multiple device):

```
    const userInfo : decodeType = socket.data.userDetails      
    const alreadyLogin = await this.RC.getValue(userInfo.id)
    if(alreadyLogin !== socket.id && alreadyLogin || alreadyLogin === undefined  )
      socket.emit('already-login' )
    await this.RC.setValue(userInfo.id, socket.id)
```
- Register:
 
 ```
 export const register: RequestHandler = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const isDuplicate = await users.findAll({ where: { email: `${email}` } });
  if (isDuplicate.length > 0)
    return res.status(400).send("Email already exsist");
  
    // create new account if not exsist
  let encryptPass = await bcrypt.hash(`${password}`, 5);
  await users
    .create({
      id: `${v4()}`,
      email: `${email}`,
      username: `${username}`,
      password: `${encryptPass}`,
    }).then(async (storedUser : users) =>{
        const token = jwt.sign(
          { id: storedUser.id, email: storedUser.email, username: storedUser.username },
          `${process.env.SECRET_JWT}`,
          { expiresIn: "365d" }
        );

        return res.status(201).json({id: storedUser.id,token : token, username : storedUser.username});
    }).catch((err: Error) => {
      console.error(err);
      return res.status(400).send("something went wrong");
    });
};
 ```
- Login:

```
export const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const isCreate = await users.findOne({ where: { email: `${email}` } });
  if (!isCreate) return res.status(401).send("email not exsist");

  if (!(await bcrypt.compare(`${password}`, isCreate.password)))
    return res.status(401).send("wrong password");

  //login and store user to redis if password is true
  const token = jwt.sign(
    { id: isCreate.id, email: isCreate.email, username: isCreate.username },
    `${process.env.SECRET_JWT}`,
    { expiresIn: `365d` }
  );
  return res.status(200).json({id: isCreate.id, token: token, username: isCreate.username });
};
```
- Logout:

```
  export const logout = async(req : Request, res: Response) =>{
    const userDetail : decodedToken = req.body['decode'];
    //set empty token for user
    const client = await new redisClient().getClient();
    await client.setValue(userDetail.id,'');
    return res.status(200).send('logout success')
}
```
- Create new board:

```
  const storeAuthor = async ( authorId : string, drawId: string) =>{
    await participants.create({
        id : v4(),
        authorId : authorId,
        drawId : drawId
    })
}

export const createNewBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.body["decode"] || "";
    console.log(`user id: ${id}`);
    const { boardName } = req.body
    const newBoard = await draws.create({
        id : v4(),
        name : boardName
    });
    setTimeout(()=>{
        storeAuthor(id, newBoard.id)
    },0)
    return res.status(200).json(newBoard)
  } catch (error) {
    return res.status(403).send("something went wrong, please try again later");
  }
};
```    
- Explore collection of other user:
 
 ```
  export const explore = async (req: Request, res: Response) =>{
    try {
        const {id} = req.body['decode'] || ''
        const collection = await draws.findAll({ include:[{
            model: participants,
            where: { authorId: !id}
        }] ,limit : 100})
        return res.status(200).json(collection)
    } catch (error) {
        return res.status(403).send('something went wrong, please try again later')
    }
}
 ```
 - Send invitation:
 
 ```
 export const invitation = async (data : socketHandle.dataInvitation)  =>{
    try {
        const findUserReceiveInvitation = await users.findOne({
            where : { email : data.emailReceiveInvitation}
        })
        if(!findUserReceiveInvitation)
            return {error : true, message : `email not exsist`};         
        
        //check if invitation all ready exsist
        const isInvitationAlreadyExsist = await participants.findOne({
            where : {
                drawId : data.drawId,
                pending : true
            },
            include : [{
                model : users,
                where : {
                    email : data.emailReceiveInvitation
                }
            }]
        })
        if(isInvitationAlreadyExsist)
            return  { error: true, message : 'you are already sent'}

        // create new invitation if not exsist
        const invitation = await participants.create({
            id : v4(),
            pending : true,
            authorId : findUserReceiveInvitation.id,
            drawId : data.drawId,
            sender : data.sender
        })

        return {error : false, message: `invitation has been sent`, data : invitation}

        } catch (error) {
        console.error(error);
        return {error : true, message : 'something went wrong, please try again later'}
    }
}
 ```
 - Accept/Reject invitation:
 
 ```
 export const acceptInvitation = async (data : socketHandle.dataAcceptInvitation) =>{
    try {
        await participants.update({pending : false}, {
            where : {
                id : data.participantsId
            }
        })
        const invitation = await participants.findByPk(data.participantsId)
        return {error: false, message: `invitation has been accept`, data: invitation}
    } catch (error) {
        console.log(error);
        return {error: true, message: `something went wrong, please try again later`}
    }
}

export const rejectInvitation = async (data : socketHandle.dataAcceptInvitation) =>{
    try {
        await participants.destroy({
            where : {
                participantsId : data.participantsId
            }
        })
        return {error : false, message: `invitation has been ejected`}
    } catch (error) {
        console.log(error);
        return {error : true, message : `something went wrong, please try again later`}
    }
}
 ```
 
 
