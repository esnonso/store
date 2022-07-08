const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    input clothInputData{
        brand:String!
        category:String!
        title:String!
        gender:String!
        price:Int!
        sizes:String!
        desc:String!
        quantity:Int!
        colors:String
    }

    input userInputData{
        email:String!
        password:String!
        firstname:String!
        lastname:String!
        over16:Boolean!
    }

    input userAddressInput{
        address:String!
        phone:String
    }

     type Authdata {
        userId:String!
        token:String!
        status:String!
    }

    type Clothes{
        _id:ID!
        amountInStock:Int!
        creator:User!
        title:String!
        brand:String!
        category:String!
        gender:String!
        desc:String!
        sizes:String!
        reviews:[Reviews!]!
        quantity:Int! 
        price:Int!
        colors:String  
    }

    type ClothesData{
        clothes:[Clothes!]!
    }

    type Orders{
        creator:User!
        items:[Clothes!]!
        amount:Int!
        deliveryStatus:String!
        shippingAddress:String!
        createdAt:String!
    }

    type Reviews{
        creator:User!
        body:String!
        rating:Int!
        createdAt:String!
    }

    type User{
        id:ID!
        email:String!
        firstname:String!
        lastname:String!
        phone:String!
        status:String!
        address:String!
        birthDate:String!
        accountStatus:String!
        confirmationCode:String!
        resetPasswordToken:String!
        clothesBought:[Orders!]!
        clothesCreated:[Clothes!]! 
        reviews:[Reviews!]!
    }

    type RootMutation{
        createCloth(clothInput:clothInputData):String!
        createUser(userInput:userInputData):String!
        createUserAddress(address:userAddressInput):String!

        editCloth(id:ID! clothInput:clothInputData): String!
    }

    type RootQuery{
        login(email:String! password:String!): Authdata!
        getClothes(category:String!, gender:String!):ClothesData!
        getSingleCloth(id:ID!):Clothes!
        getUser:User!
        verifyUser(code:String!):String!
    }
    
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`);
