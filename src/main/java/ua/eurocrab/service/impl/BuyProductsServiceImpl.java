package ua.eurocrab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.eurocrab.domain.BuyProductsDTO;
import ua.eurocrab.entity.BuyProductsEntity;
import ua.eurocrab.repository.BuyProductsRepository;
import ua.eurocrab.service.BuyProductsService;
import ua.eurocrab.utils.ObjectMapperUtils;

import java.util.List;

@Service
public class BuyProductsServiceImpl implements BuyProductsService {
    @Autowired
    private BuyProductsRepository buyProductsRepository;

    @Autowired
    private ObjectMapperUtils modelMapper;


    @Override
    public BuyProductsDTO saveBuyProduct(BuyProductsDTO buyProduct) {
        BuyProductsEntity bPE = buyProductsRepository.save(modelMapper.map(buyProduct, BuyProductsEntity.class));
        BuyProductsDTO buyProductsDTO = modelMapper.map(bPE, BuyProductsDTO.class);
        return buyProductsDTO;
    }

    @Override
    public List<BuyProductsDTO> findAllByOrderId(Long id) {
        List<BuyProductsEntity> bPE = buyProductsRepository.findAllByOrderId(id);
        List<BuyProductsDTO> buyProductsDTO = modelMapper.mapAll(bPE, BuyProductsDTO.class);
        return buyProductsDTO;
    }

    @Override
    public List<BuyProductsDTO> findAll() {
        List<BuyProductsEntity> bPE = buyProductsRepository.findAllSortByProductId();
        List<BuyProductsDTO> buyProductsDTO = modelMapper.mapAll(bPE, BuyProductsDTO.class);
        return buyProductsDTO;
    }
}
