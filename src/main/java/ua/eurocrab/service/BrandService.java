package ua.eurocrab.service;

import ua.eurocrab.domain.BrandDTO;

import java.util.List;

public interface BrandService {
    List<BrandDTO> findAllBrands();

    BrandDTO saveBrand(BrandDTO brand);

    BrandDTO findBrandById(Long bId);

    List<BrandDTO> findBrandByCategoryId(Long id);
}
