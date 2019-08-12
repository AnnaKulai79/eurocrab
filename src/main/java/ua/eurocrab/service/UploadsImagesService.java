package ua.eurocrab.service;

import ua.eurocrab.domain.UploadsImagesDTO;

import java.io.IOException;
import java.util.List;

public interface UploadsImagesService {
    List<UploadsImagesDTO> findImagesByProductId(Long id);

    UploadsImagesDTO saveImage(UploadsImagesDTO uploadsImagesDTO) throws IOException;

    void deleteImagesById(Long id);
}
