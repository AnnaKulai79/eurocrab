package ua.eurocrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.eurocrab.domain.UploadsImagesDTO;
import ua.eurocrab.service.UploadsImagesService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("upload_images")
public class UploadsImagesController {
    @Autowired
    private UploadsImagesService uploadsImagesService;

    @GetMapping("{id}")
    public ResponseEntity<?> findImagesByProductId(@PathVariable("id") Long id) {
        List<UploadsImagesDTO> galleryImages = uploadsImagesService.findImagesByProductId(id);
        return new ResponseEntity<>(galleryImages, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<?> saveImages(@RequestBody UploadsImagesDTO uploadsImagesDTO) throws IOException {
        UploadsImagesDTO image = uploadsImagesService.saveImage(uploadsImagesDTO);
        return new ResponseEntity<>(image, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteImageById(@PathVariable("id") Long id) {
        uploadsImagesService.deleteImagesById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
