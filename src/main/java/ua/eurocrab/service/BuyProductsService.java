package ua.eurocrab.service;

import ua.eurocrab.domain.BuyProductsDTO;

import java.util.List;

public interface BuyProductsService {
    BuyProductsDTO saveBuyProduct(BuyProductsDTO buyProduct);

    List<BuyProductsDTO> findAllByOrderId(Long id);

    List<BuyProductsDTO> findAll();
}
