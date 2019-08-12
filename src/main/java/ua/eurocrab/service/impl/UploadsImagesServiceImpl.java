package ua.eurocrab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;
import ua.eurocrab.domain.MyMultipartFile;
import ua.eurocrab.domain.UploadsImagesDTO;
import ua.eurocrab.entity.UploadsImagesEntity;
import ua.eurocrab.repository.UploadsImagesRepository;
import ua.eurocrab.service.UploadsImagesService;
import ua.eurocrab.utils.ObjectMapperUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.List;
import java.util.UUID;

@Service
public class UploadsImagesServiceImpl implements UploadsImagesService {
    @Autowired
    private UploadsImagesRepository uploadsImagesRepository;

    @Autowired
    private ObjectMapperUtils modelMapper;

    @Autowired
    private HttpServletRequest request;

    @Override
    public List<UploadsImagesDTO> findImagesByProductId(Long id) {
        List<UploadsImagesEntity> imagesEn = uploadsImagesRepository.findAllProductId(id);
        List<UploadsImagesDTO> imagesDTOS = modelMapper.mapAll(imagesEn, UploadsImagesDTO.class);
        return imagesDTOS;
    }

    @Override
    public UploadsImagesDTO saveImage(UploadsImagesDTO uploadsImagesDTO) throws IOException {
        UploadsImagesEntity uploadsImagesEntity = modelMapper.map(uploadsImagesDTO, UploadsImagesEntity.class);
        BASE64Decoder base64Decoder = new BASE64Decoder();
        byte[] fileContent = base64Decoder.decodeBuffer(uploadsImagesDTO.getImage().split(",")[1]);
        String extension = uploadsImagesDTO.getImage().split(",")[0].split("/")[1].split(";")[0];
        String name = UUID.randomUUID().toString();
        MyMultipartFile multipartFile = new MyMultipartFile(name, extension, fileContent);
       // String PATH = "/root/uploads_images";
        String PATH = "uploads_images";
        File folder = new File(PATH);
        if(!folder.exists()) {
            folder.mkdirs();
        }
        multipartFile.transferTo(new File(PATH + "/" + name + "." +extension));
        //saveOnMashineImage(multipartFile);

        uploadsImagesEntity.setImage(name + "." + extension);
        return modelMapper.map(uploadsImagesRepository.save(uploadsImagesEntity), UploadsImagesDTO.class);
    }

    @Override
    public void deleteImagesById(Long id) {
        UploadsImagesEntity image = uploadsImagesRepository.findById(id).get();
        String PATH = "uploads_images";
        File newMultipartFile = new File(PATH + "/" + image.getImage());
        newMultipartFile.delete();
        uploadsImagesRepository.deleteById(id);
    }

    private void saveOnMashineImage(MultipartFile multipartFile) throws IOException {
//        String PATH = "E:/Ann/eurocrab/src/main/resources/static/uploads_images";
//        String PATH = "C:/eurocrab/src/main/resources/static/uploads_images";
        String PATH = "uploads_images";
        File folder = new File(PATH);
        if(!folder.exists()) {
            folder.mkdirs();
        }

        File newMultipartFile = new File(PATH + "/" + multipartFile.getOriginalFilename());
        OutputStream outputStream = new FileOutputStream(newMultipartFile);
        BufferedOutputStream buf = new BufferedOutputStream(outputStream);
        buf.write(multipartFile.getBytes(),0,multipartFile.getBytes().length);
        buf.flush();
        buf.close();
        outputStream.close();
    }

}
