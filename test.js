function a() {
  return Promise.resolve(1)
}

async function b() {
  const res =  await a();
  console.log("RES", res);
}

b()