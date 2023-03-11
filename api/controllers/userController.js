import { StatusCodes, ReasonPhrases } from "http-status-codes";
import registerUserSchema from '../validators/user/registerUserSchema';
import updateUserSchema from '../validators/user/updateUserSchema';
import admin from '../services/firebase';
import userModel from '../models/userModel';


const adminEmails = ['ek51840@ubt-uni.net', 'ab52106@ubt-uni.net'];

export default{
    register: async (req, res) => {
        // validate the user input
        const validationResult = registerUserSchema.validate(req.body)

        if (validationResult.error) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json({
                    error: validationResult.error.message,
                    message: ReasonPhrases.BAD_REQUEST
                });
        }

        const { name, email, password } = req.body;
        try {
            const user = await admin.auth().createUser({
                email,
                password
            })

            await admin.auth().updateUser(user.uid, { displayName: name })

            if (adminEmails.includes(user.email)) {
                const userClaim = { admin: true }
                await admin.auth().setCustomUserClaims(user.uid, userClaim);
                await admin.firestore().collection("roles")
                    .doc(user.uid)
                    .set({
                        email: user.email,
                        role: userClaim
                    })
            }

            return res.json({ user });
        } catch (error) {
            return res.status(StatusCodes.FORBIDDEN).json({ error: error.message, message: ReasonPhrases.FORBIDDEN })

        }
    },
    list: async(req, res) => {
        try {
            let page = req.query.page || 1;
      
            const limitValue = req.query.limit || 10;
            const skipValue = (page - 1) * limitValue || 0;
      
            const list = await userModel.find().skip(skipValue).limit(limitValue);
      
            return res.json({ page: page, list: list.reverse() });
          } catch (error) {
            console.error("Error while getting users: " + error.message);
            res.json("Error while getting users: " + error.message);
          }
    },
    // create: async (req, res) => {
    //     const validationResult = registerUserSchema.validate(req.body);

    //     if(validationResult.error){
    //         return res.status(StatusCodes.LENGTH_REQUIRED).json({
    //             message: ReasonPhrases.LENGTH_REQUIRED,
    //             error: validationResult.error.message,
    //           });
    //     }

    //     const newUser = new userModel(validationResult.value);

    //     try{
    //         await newUser.save();
    //         return res.json(newUser);
    //     }catch(err){
    //         return res.json(StatusCodes.UNAUTHORIZED).json({
    //             message: ReasonPhrases.UNAUTHORIZED,
    //             error: err.message,
    //           });
    //     }
    // },
    edit: async (req, res) => {
        const validationResult = updateUserSchema.validate(req.body);

        if(validationResult.error){
            return res.status(StatusCodes.LENGTH_REQUIRED).json({
                message: ReasonPhrases.LENGTH_REQUIRED,
                error: validationResult.error.message,
              });
        }

        try{
            const user = await userModel.find({
                _id: req.params.userId,
            });

            if(user == null){
                console.error("null");
                return;
            }

            const update = req.body;

            await userModel.updateOne({_id:req.params.postId},{$set:update});
            const updatedUser = await userModel.find({
                _id:req.params.postId,
            }) ;

            return res.json(updatedUser);
        }catch(err){
            console.error(ReasonPhrases.NOT_FOUND);
            return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);      
        }
    },
    delete: async (req, res) => {
        const userId = req.params.userId;

        try{
            await userModel.deleteOne({_id: userId});
            res.json({ deleted: true});
        }catch(error){
            return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: ReasonPhrases.NOT_FOUND });
        }
    }
};