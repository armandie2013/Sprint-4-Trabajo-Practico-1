export function transformarCamposArray(req, res, next) {
  const campos = ["poderes", "aliados", "enemigos"];

  campos.forEach((campo) => {
    if (req.body[campo] && typeof req.body[campo] === "string") {
      req.body[campo] = req.body[campo]
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    }
  });

  next();
}
