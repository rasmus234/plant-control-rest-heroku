import "./common/env";
import Database from "./common/database";
import Server from "./common/server";
import routes from "./routes";
import {Plant} from "./api/models/plant";
import {Logger as PlantLogger} from "./api/models/logger";
import {Example} from "./api/models/example";
import Logger from "./common/logger";
import {Pairing} from "./api/models/pairing";
import {Log} from "./api/models/log";

const port = parseInt(process.env.PORT || "3000");
const connectionString =
    process.env.NODE_ENV === "production"
        ? process.env.MONGODB_URI
        : process.env.NODE_ENV === "test"
            ? process.env.MONGODB_URI_TEST ||
            "mongodb://localhost:27017/plant-control"
            : process.env.MONGODB_URI_DEV ||
            "mongodb://localhost:27017/plant-control-test";

const db = new Database(connectionString);
export default new Server().database(db).router(routes).listen(port);

savePairing();

async function savePairing() {
    // const plant = new Plant({name: "test", createdAt: new Date()});
    // const plantSaved = await plant.save();
    //
    // const logger = new PlantLogger({name: "test", createdAt: new Date()});
    // const loggerSaved = await logger.save();
    //
    // const pairing = new Pairing({name: "testPairing", createdAt: new Date(), plant: plantSaved, logger: loggerSaved});
    // const pairingSaved = await pairing.save();
    // console.log(pairingSaved);


    Pairing.findOne().populate({path: "plant", model: Plant}).populate("logger", PlantLogger).then(pairings => {
        console.log(pairings);
    });
}

