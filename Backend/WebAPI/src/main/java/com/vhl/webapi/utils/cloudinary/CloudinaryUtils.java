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

        System.out.println(finalName);
        return finalName;
    }

    public static String extractPublicIdFromUrl(String url) {
        try {
            if (url == null || url.isBlank()) {
                return null;
            }

            String[] parts = url.split("/upload/");
            if (parts.length < 2) {
                return null;
            }

            String path = parts[1];
            int slashIndex = path.indexOf('/');
            if (slashIndex == -1) {
                return null;
            }

            String publicIdWithExt = path.substring(slashIndex + 1);
            int lastDot = publicIdWithExt.lastIndexOf('.');
            if (lastDot == -1) {
                return publicIdWithExt;
            }

            return publicIdWithExt.substring(0, lastDot);
        } catch (Exception e) {
            return null;
        }
    }
}
