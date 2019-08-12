package ua.eurocrab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.eurocrab.domain.BrandDTO;
import ua.eurocrab.entity.BrandEntity;
import ua.eurocrab.entity.CategoryEntity;
import ua.eurocrab.repository.BrandRepository;
import ua.eurocrab.repository.CategoryRepository;
import ua.eurocrab.service.BrandService;
import ua.eurocrab.utils.ObjectMapperUtils;

import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {
    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ObjectMapperUtils modelMapper;


    @Override
    public List<BrandDTO> findAllBrands() {
        List<BrandEntity> brands = brandRepository.findAll();
        List<BrandDTO> brandDTOs = modelMapper.mapAll(brands,BrandDTO.class);
        return  brandDTOs;
    }

    @Override
    public BrandDTO saveBrand(BrandDTO brand) {
        BrandEntity brandEntity = modelMapper.map(brand,BrandEntity.class);
        brandEntity = brandRepository.save(brandEntity);
        BrandDTO brandDTO = modelMapper.map(brandEntity,BrandDTO.class);
        return brandDTO;
    }

    @Override
    public BrandDTO findBrandById(Long id) {
//        boolean exists = brandRepository.existsById(id);
//        if (!exists){
//            return null;
//        }
        BrandEntity brand = brandRepository.findById(id).get();
        System.out.println(brand.getBrand() + "brand!!!!!!!!!!!!!!!");
        BrandDTO brandDTO = modelMapper.map(brand,BrandDTO.class);
        return brandDTO;
    }

    @Override
    public List<BrandDTO> findBrandByCategoryId(Long id) {
        CategoryEntity category = categoryRepository.findById(id).get();
        List<BrandEntity> brands = brandRepository.findAllByCategory(category);
        List<BrandDTO> brandDTOs = modelMapper.mapAll(brands,BrandDTO.class);
        return brandDTOs;
    }
}
