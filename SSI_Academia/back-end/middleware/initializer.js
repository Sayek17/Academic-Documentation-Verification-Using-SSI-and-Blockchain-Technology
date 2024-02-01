import bcrypt from "bcrypt";
import {User} from "../model/user.js";
import {SchemaDetails} from "../model/SchemaDetails.js";
import {createCredentialDefinitionInLedger, createSchemaInLedger} from "../helper/Ledger.js";

const DEFAULT_ADMIN_PASSWORD = "12345678";

async function createAdminUserIfNeeded() {
    let adminUser = await User.findOne({email: "admin@example.com"});

    if (adminUser) {
        console.log("Admin user already exists");
        return;
    }

    adminUser = new User({
        name: "Brac University Admin",
        email: "admin@bracu.com",
        password: DEFAULT_ADMIN_PASSWORD,
        role: "ADMIN",
    });

    const salt = await bcrypt.genSalt(10);
    adminUser.password = await bcrypt.hash(adminUser.password, salt);

    try {
        await adminUser.validate();
        await adminUser.save();
        console.log(
            "Admin user created with default password:",
            DEFAULT_ADMIN_PASSWORD
        );
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            console.log("Admin user already exists");
        } else {
            console.error("Error creating admin user:", err.message);
        }
    }
}

async function createSchemaIfNeeded() {
    try {
        const existingSchemaDetails = await SchemaDetails.findOne();

        if (!existingSchemaDetails) {
            const schemaId = await createSchemaInLedger();

            if (schemaId === "False" || schemaId == null) {
                return;
            } else {
                const newSchemaDetails = new SchemaDetails({
                    schema_id: schemaId,
                    cred_def_id: '',
                });

                await newSchemaDetails.save();
                console.log('Schema details created.');
            }
        } else {
            existingSchemaDetails.cred_def_id = await createCredentialDefinitionInLedger(existingSchemaDetails.schema_id);
            await existingSchemaDetails.save();

            console.log('Schema details updated.');
        }
    } catch (error) {
        console.error('Error initializing schema details:', error);
    }
}


export {createAdminUserIfNeeded, createSchemaIfNeeded};
