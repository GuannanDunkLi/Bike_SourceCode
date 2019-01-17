package com.bingo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

// 跟MongoDB中的bikes collection关联上了
@Document(collection = "bikes")
public class Bike {
    // 主键（唯一、建立索引）
    @Id
    private String id;
    // 表示经纬度的数组[经度, 纬度]
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private double[] location;
    @Indexed
    private Long bikeNo;
    private int status; // 表示是否使用

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public double[] getLocation() {
        return location;
    }
    public void setLocation(double[] location) {
        this.location = location;
    }
    public Long getBikeNo() {
        return bikeNo;
    }
    public void setBikeNo(Long bikeNo) {
        this.bikeNo = bikeNo;
    }
    public int getStatus() {
        return status;
    }
    public void setStatus(int status) {
        this.status = status;
    }
}
