package ua.eurocrab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.eurocrab.domain.IpaddDTO;
import ua.eurocrab.entity.IpaddEntity;
import ua.eurocrab.repository.IpaddRepository;
import ua.eurocrab.service.IpaddService;
import ua.eurocrab.utils.ObjectMapperUtils;

import java.util.List;

@Service
public class IpaddServiceImpl implements IpaddService {
    @Autowired
    private IpaddRepository ipaddRepository;

    @Autowired
    private ObjectMapperUtils modelMapper;

    @Override
    public List<IpaddDTO> findAllIpadd() {
        return modelMapper.mapAll(ipaddRepository.findAll(),IpaddDTO.class);

    }

    @Override
    public IpaddDTO saveIpadd(String ipadd) {
        int count = ipaddRepository.findCountAllByIp(ipadd);
        IpaddEntity ipaddEntities = new IpaddEntity();
        if(count>0) {
           ipaddEntities = ipaddRepository.findAllByIp(ipadd);
           ipaddEntities.setCount(ipaddEntities.getCount()+1);
        }else{
            ipaddEntities.setIp(ipadd);
            ipaddEntities.setCount((long) 1);
        }
        return modelMapper.map(ipaddRepository.save(ipaddEntities),IpaddDTO.class);
    }
}
