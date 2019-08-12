package ua.eurocrab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;
import ua.eurocrab.domain.CategoryBrandDTO;
import ua.eurocrab.domain.CategoryDTO;
import ua.eurocrab.domain.MyMultipartFile;
import ua.eurocrab.entity.BrandEntity;
import ua.eurocrab.entity.CategoryEntity;
import ua.eurocrab.repository.BrandRepository;
import ua.eurocrab.repository.CategoryRepository;
import ua.eurocrab.service.CategoryService;
import ua.eurocrab.utils.ObjectMapperUtils;

import java.io.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ObjectMapperUtils modelMapper;


    @Override
    public List<CategoryBrandDTO> findAllCategories() {
        List<CategoryEntity> categories = categoryRepository.findAll();
        List<BrandEntity> brands = new ArrayList<>();
        List<CategoryBrandDTO> categoryBrandDTOs = new ArrayList<>();
        Iterator<CategoryEntity> iteratorCat = categories.iterator();
        while (iteratorCat.hasNext() ) {
            CategoryEntity nextCat = iteratorCat.next();
            brands = brandRepository.findAllByCategory(nextCat);
            Iterator<BrandEntity> iteratorBrand = brands.iterator();
            while (iteratorBrand.hasNext() ) {
                CategoryBrandDTO nextCatBrand = new CategoryBrandDTO();
                BrandEntity nextBrand = iteratorBrand.next();
                nextCatBrand.setId(nextBrand.getId());
                nextCatBrand.setType(nextCat.getType());
                nextCatBrand.setName(nextCat.getName());
                nextCatBrand.setBrand(nextBrand.getBrand());
                categoryBrandDTOs.add(nextCatBrand);
            }
        }

        return  categoryBrandDTOs;
    }

    @Override
    public CategoryBrandDTO saveCategory(CategoryBrandDTO categoryBrandDTO) throws IOException {
        CategoryEntity categoryEntity = new CategoryEntity();
        fillCategoryEntity(categoryBrandDTO, categoryEntity);
        Long alreadyExistCount = categoryRepository.existsByType(categoryEntity.getType());
        CategoryEntity categoryEn = new CategoryEntity();
        if(alreadyExistCount > 0) {
            categoryEn = categoryRepository.findByType(categoryEntity.getType());
        }else{
//            CategoryEntity catEntity = modelMapper.map(productsDTO,ProductsEntity.class);
            BASE64Decoder base64Decoder = new BASE64Decoder();
            byte[] fileContent = base64Decoder.decodeBuffer(categoryBrandDTO.getIcon().split(",")[1]);
            String extension = categoryBrandDTO.getIcon().split(",")[0].split("/")[1].split(";")[0];
            String nameI = categoryEntity.getType() + "-icon";
            MyMultipartFile multipartFileI = new MyMultipartFile(nameI, extension, fileContent);
            saveOnMashine(multipartFileI);

            categoryEntity.setIcon(nameI + "." +extension);
            categoryEn = categoryRepository.save(categoryEntity);
        };
        alreadyExistCount += brandRepository.existsByBrand(categoryBrandDTO.getBrand(),categoryEn);
        if(alreadyExistCount > 1) {
            return null;
        };
        BrandEntity brandEntity = new BrandEntity();
        brandEntity.setBrand(categoryBrandDTO.getBrand());
        brandEntity.setCategories(categoryEn);
        BrandEntity brandEn = brandRepository.save(brandEntity);
        categoryBrandDTO.setId(brandEn.getId());
        categoryBrandDTO.setIcon(categoryEn.getIcon());
        return categoryBrandDTO;
    }

    private void fillCategoryEntity(CategoryBrandDTO categoryBrandDTO, CategoryEntity categoryEntity) {
        categoryEntity.setType(categoryBrandDTO.getType());
        categoryEntity.setName(categoryBrandDTO.getName());
    }

    @Override
    public List<CategoryDTO> findAllCategory() {
        List<CategoryEntity> categories = categoryRepository.findAll();
        List<CategoryDTO> categoryDTOs = modelMapper.mapAll(categories,CategoryDTO.class);
        return  categoryDTOs;
    }

    @Override
    public void deleteCategory(Long id) {
        BrandEntity brandEntity = brandRepository.getOne(id);
        brandRepository.deleteById(id);
        Long countCategories = brandRepository.existsByCategory(brandEntity.getCategories());
        if(countCategories == 0){
            categoryRepository.delete(brandEntity.getCategories());
        }
    }

    @Override
    public CategoryBrandDTO findCategoryBrand(Long id) {
        BrandEntity brand = brandRepository.findById(id).get();
        List<CategoryEntity> categories = categoryRepository.findAll();
        CategoryBrandDTO categoryBrandDTO = null;
        Iterator<CategoryEntity> iteratorCat = categories.iterator();
        while (iteratorCat.hasNext() ) {
            CategoryEntity nextCat = iteratorCat.next();
            if(iteratorCat.equals(brand.getCategories())) {
                categoryBrandDTO.setId(brand.getId());
                categoryBrandDTO.setType(nextCat.getType());
                categoryBrandDTO.setName(nextCat.getName());
                categoryBrandDTO.setBrand(brand.getBrand());
            }
        }
        return  categoryBrandDTO;
    }

    private  void saveOnMashine(MultipartFile multipartFile) throws IOException {
//        String PATH = "/root/images";
//        String PATH = "C:/eurocrab/src/main/resources/static/uploads_images";
        String PATH = "images";
        File folder = new File(PATH);
        if(!folder.exists()) {
            folder.mkdirs();
        }
        File newMultipartFile = new File(PATH + "/" + multipartFile.getOriginalFilename());
        OutputStream outputStream = new FileOutputStream(newMultipartFile);
        BufferedOutputStream buf = new BufferedOutputStream(outputStream);
        buf.write(multipartFile.getBytes(),0,multipartFile.getBytes().length);
        buf.flush();
    }

}
