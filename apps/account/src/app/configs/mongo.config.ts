import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

export const getMongoConfig=():MongooseModuleAsyncOptions=>{
return{
    useFactory:(configService:ConfigService)=>({
        uri:getMongoString(configService)
    }),
    inject:[ConfigService],
    imports:[ConfigModule]}

}
const getMongoString=(configService:ConfigService)=>
'mongodb://localhost:27017/'
/* 'mongodb://'+
configService.get('MONGO_LOGIN')+
':'+
configService.get('MONGO_PASSWORD')+
'@'+
configService.get('MONG_HOST')+
':'+
configService.get('MONGO_PORT')+
'/'+
configService.get('MONGO_DATABASE')+
'&authSource='+
configService.get('MONGO_AUTHDATABASE'); */