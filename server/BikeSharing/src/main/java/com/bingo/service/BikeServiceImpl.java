package com.bingo.service;

import com.bingo.model.Bike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Metrics;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.NearQuery;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BikeServiceImpl implements BikeService {
    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 将bike数据添加到mongodb中的bikes collection中
     *
     * @param bike
     */
    @Override
    public void save(Bike bike) {
        mongoTemplate.insert(bike); // 在bike类中添加了映射注解，保存了映射关系
    }

    /**
     * 根据当前经纬度查找附近的bikes
     *
     * @param longitude
     * @param latitude
     * @return
     */
    @Override
    public List<GeoResult<Bike>> findNear(double longitude, double latitude) {
        // 200米范围内，状态为的0的bike， 数量限制20
        NearQuery nearQuery = NearQuery
                .near(longitude, latitude)
                .maxDistance(0.8, Metrics.KILOMETERS)
                .query(new Query(Criteria.where("status").is(0)).limit(20));
        GeoResults<Bike> geoResults = mongoTemplate.geoNear(nearQuery, Bike.class);
        return geoResults.getContent();
    }
}
