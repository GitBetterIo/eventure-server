const bcrypt = require('bcrypt');
const uuid = require('uuid/v4')

const hashPassword = plaintextPassword => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plaintextPassword, salt)
}

exports.seed = function(knex, Promise) {
  const adminId = uuid();

  return knex('person').del()
    .then(function () {
      return knex('person').insert([
        {id: adminId, organization_id: null, type: 'admin', email: 'aaron@topshelfrobot.com',},
        {
          "id": "202b2257-2d69-4c27-8a3c-31252449478b",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Sabrina",
          "last_name": "Norton",
          "email": "sabrinanorton@diginetic.com",
          "birth_date": "Sat Dec 14 1963 23:31:06",
          "gender": "female"
        },
        {
          "id": "c1a61add-40b9-4d1d-9077-5cd7b2eb5c11",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Janette",
          "last_name": "Chambers",
          "email": "janettechambers@diginetic.com",
          "birth_date": "Mon Jul 26 1965 10:50:39",
          "gender": "female"
        },
        {
          "id": "5f35a2f9-103c-40fd-aa9b-1510a8eaa5ec",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Mccullough",
          "last_name": "Mcfadden",
          "email": "mcculloughmcfadden@diginetic.com",
          "birth_date": "Tue Mar 04 1969 11:45:12",
          "gender": "male"
        },
        {
          "id": "be60f6e1-dcce-4506-866d-e5350c5165b6",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Mckee",
          "last_name": "Nichols",
          "email": "mckeenichols@diginetic.com",
          "birth_date": "Wed Jun 20 1984 13:40:46",
          "gender": "male"
        },
        {
          "id": "95135c7b-53b0-4c20-a76c-48047d8db5e3",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Berta",
          "last_name": "Oneal",
          "email": "bertaoneal@diginetic.com",
          "birth_date": "Tue Jun 07 1983 17:09:42",
          "gender": "female"
        },
        {
          "id": "88f77a3f-e946-4247-93a1-61f6e0f689c7",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Bethany",
          "last_name": "Hubbard",
          "email": "bethanyhubbard@diginetic.com",
          "birth_date": "Wed Aug 27 1980 19:43:30",
          "gender": "female"
        },
        {
          "id": "15dcd087-6bdf-40db-8af6-ac2490fc6633",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Edna",
          "last_name": "Schmidt",
          "email": "ednaschmidt@diginetic.com",
          "birth_date": "Sun Jul 06 2008 19:59:48",
          "gender": "female"
        },
        {
          "id": "f0adb85d-7bfa-4e15-a601-7200b0bfdbef",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Preston",
          "last_name": "Hull",
          "email": "prestonhull@diginetic.com",
          "birth_date": "Tue Sep 18 1979 04:20:08",
          "gender": "male"
        },
        {
          "id": "4f190af8-1387-4e20-8d92-888bc1dd95f0",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Gena",
          "last_name": "Zimmerman",
          "email": "genazimmerman@diginetic.com",
          "birth_date": "Wed Apr 18 1990 18:03:16",
          "gender": "female"
        },
        {
          "id": "d55bbef1-2fc3-43c6-8f50-9d9ba63cb176",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Aguilar",
          "last_name": "Stephens",
          "email": "aguilarstephens@diginetic.com",
          "birth_date": "Tue Sep 28 1982 15:39:24",
          "gender": "male"
        },
        {
          "id": "3b879dd4-64b8-4b02-bc19-cbf2ffc7714d",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Marks",
          "last_name": "Sharp",
          "email": "markssharp@diginetic.com",
          "birth_date": "Fri Aug 05 1983 16:24:22",
          "gender": "male"
        },
        {
          "id": "886e02df-3723-4e3d-bfbc-9e3b67c043bf",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Celina",
          "last_name": "Potter",
          "email": "celinapotter@diginetic.com",
          "birth_date": "Wed Oct 08 1975 10:34:52",
          "gender": "female"
        },
        {
          "id": "56d561ec-2191-47f5-97a9-76e3625bdd5a",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Jerri",
          "last_name": "Rojas",
          "email": "jerrirojas@diginetic.com",
          "birth_date": "Fri Jun 19 1998 19:43:08",
          "gender": "female"
        },
        {
          "id": "83d71301-ccab-4fa2-bf9e-10b6f19e084d",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Elisa",
          "last_name": "Franco",
          "email": "elisafranco@diginetic.com",
          "birth_date": "Sat Jan 03 1998 03:44:30",
          "gender": "female"
        },
        {
          "id": "4a8e90b3-0214-4abc-9329-a94faa000b17",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Haney",
          "last_name": "Hayes",
          "email": "haneyhayes@diginetic.com",
          "birth_date": "Mon Oct 21 1974 04:19:41",
          "gender": "male"
        },
        {
          "id": "45c72f83-511a-40ef-8962-a87bbe04dfc1",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Rodriquez",
          "last_name": "Shelton",
          "email": "rodriquezshelton@diginetic.com",
          "birth_date": "Thu Jun 01 2006 13:32:49",
          "gender": "male"
        },
        {
          "id": "ee875785-fb59-425e-8e58-fd1117363030",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Bobbi",
          "last_name": "Macias",
          "email": "bobbimacias@diginetic.com",
          "birth_date": "Thu Dec 21 1995 07:42:40",
          "gender": "female"
        },
        {
          "id": "776000bc-b62a-48c3-990d-67dc96d9838f",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Delgado",
          "last_name": "Rosario",
          "email": "delgadorosario@diginetic.com",
          "birth_date": "Wed Jun 04 1975 11:56:31",
          "gender": "male"
        },
        {
          "id": "1be91217-83e0-4ed7-b386-aece557e1836",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Spears",
          "last_name": "Stark",
          "email": "spearsstark@diginetic.com",
          "birth_date": "Fri May 11 2001 01:53:16",
          "gender": "male"
        },
        {
          "id": "f0ff4bdb-e0c5-4a8c-b991-c8e51c57e58f",
          "organization_id": "d3b86b88-e3e3-4783-b41b-11f43c23ab27",
          "type": "participant",
          "first_name": "Mooney",
          "last_name": "Anthony",
          "email": "mooneyanthony@diginetic.com",
          "birth_date": "Thu Apr 06 1978 08:28:25",
          "gender": "male"
        }
      ]);
    })
    .then(() => knex('person_login').insert([
      {id: adminId, password_hash: hashPassword('password')},
    ]))
};
