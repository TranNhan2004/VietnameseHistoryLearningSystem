package com.vhl.webapi.utils.cloudinary;

import com.vhl.webapi.utils.shortuuid.ShortUUID;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class CloudinaryUtils {

    public static String normalizeFileName(String originalName) {
        if (originalName == null) {
            return "file";
        }

        int lastDot = originalName.lastIndexOf('.');
        String namePart = (lastDot == -1) ? originalName : originalName.substring(0, lastDot);

        String normalized = Normalizer.normalize(namePart, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        normalized = pattern.matcher(normalized).replaceAll("");

        normalized = normalized.replaceAll("[^\\w\\d\\-_]+", "_");

        String finalName = normalized + "_" + ShortUUID.generateShortUUID();
        return finalName;
    }

    public static String extractPublicIdFromUrl(String url) {
        try {
            if (url == null || url.isBlank()) {
                return "";
            }

            String[] parts = url.split("/v1/");
            if (parts.length < 2) {
                return "";
            }

            String path = parts[1];
            int paramIndex = path.lastIndexOf("?");

            if (paramIndex == -1) {
                return path;
            }

            return path.substring(0, paramIndex);
        } catch (Exception e) {
            return null;
        }
    }
}
