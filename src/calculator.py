from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

# Serve the calculator UI from the static/ directory
app.mount("/", StaticFiles(directory="static", html=True), name="static")


class CalcRequest(BaseModel):
    a: float
    b: float
    op: str  # "+", "-", "*", "/"


@app.post("/api/calc")
async def calculate(req: CalcRequest):
    if req.op == "+":
        result = req.a + req.b
    elif req.op == "-":
        result = req.a - req.b
    elif req.op == "*":
        result = req.a * req.b
    elif req.op == "/":
        if req.b == 0:
            return JSONResponse({"error": "Division by zero"}, status_code=400)
        result = req.a / req.b
    else:
        return JSONResponse({"error": "Invalid operator"}, status_code=400)
    return {"result": result}
