"""
models/detector.py
------------------
Módulo de detecção de pragas via IA.

TODO (Time IA):
- Treinar modelo YOLOv8 com dataset de guaraná (saudável vs. pragas)
- Salvar os pesos em: ai_model/weights/guarassist.pt
- Descomentar o bloco YOLO abaixo e remover o stub

Pragas comuns do guaraná que o modelo deve detectar:
- Antracnose (Colletotrichum sp.)
- Superbrotamento (fitoplasma)
- Mosca-das-frutas
- Cochonilha
"""

import io
from PIL import Image

# ─── STUB (usado enquanto o modelo real não está pronto) ────────────────────
def detect_disease(image_bytes: bytes) -> dict:
    """
    Recebe bytes de imagem e retorna resultado da análise.
    Substitua este stub pela integração real com YOLO abaixo.
    """
    # Valida se a imagem é legível
    image = Image.open(io.BytesIO(image_bytes))
    image.verify()

    # TODO: remover stub e usar modelo real
    return {
        "status": "saudavel",           # "saudavel" | "praga_detectada"
        "disease": None,                # ex: "Antracnose"
        "confidence": 0.92,             # 0.0 a 1.0
        "bounding_boxes": []            # lista de {x, y, w, h, label}
    }


# ─── INTEGRAÇÃO YOLO (descomentar quando o modelo estiver treinado) ──────────
#
# from ultralytics import YOLO
# import numpy as np
#
# _model = None
#
# def _load_model():
#     global _model
#     if _model is None:
#         _model = YOLO("../ai_model/weights/guarassist.pt")
#     return _model
#
# def detect_disease(image_bytes: bytes) -> dict:
#     model = _load_model()
#     image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
#     results = model(np.array(image))[0]
#
#     if len(results.boxes) == 0:
#         return {"status": "saudavel", "disease": None, "confidence": 1.0, "bounding_boxes": []}
#
#     best = max(results.boxes, key=lambda b: float(b.conf))
#     label = results.names[int(best.cls)]
#     confidence = float(best.conf)
#     x1, y1, x2, y2 = best.xyxy[0].tolist()
#
#     return {
#         "status": "praga_detectada",
#         "disease": label,
#         "confidence": round(confidence, 4),
#         "bounding_boxes": [{"x": x1, "y": y1, "w": x2 - x1, "h": y2 - y1, "label": label}]
#     }
 
