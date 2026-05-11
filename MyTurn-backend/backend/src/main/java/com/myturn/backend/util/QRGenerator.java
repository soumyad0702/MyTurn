package com.myturn.backend.util;

import java.io.ByteArrayOutputStream;
import java.util.Base64;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

public class QRGenerator {

    // Generates Base64 PNG QR Code for frontend <img src="...">
    public static String generateBase64Png(String text) {
        try {
            QRCodeWriter writer = new QRCodeWriter();
            BitMatrix matrix = writer.encode(text, BarcodeFormat.QR_CODE, 250, 250);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            int width = matrix.getWidth();
            int height = matrix.getHeight();

            // Convert matrix -> PNG byte array
            for (int y = 0; y < height; y++) {
                for (int x = 0; x < width; x++) {
                    out.write(matrix.get(x, y) ? 0 : 255);
                }
            }

            byte[] pngBytes = out.toByteArray();
            String base64 = Base64.getEncoder().encodeToString(pngBytes);

            return "data:image/png;base64," + base64;

        } catch (WriterException e) {
            throw new RuntimeException("Failed to generate QR code", e);
        }
    }
}
