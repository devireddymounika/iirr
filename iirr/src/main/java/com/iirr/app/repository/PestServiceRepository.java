/**
 * 
 */
package com.iirr.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.iirr.app.model.States;

/**
 * @author 91901
 *
 */
public interface PestServiceRepository extends JpaRepository<States, Long> {

	@Query(nativeQuery = true, value = "select district as district, district_id as districtId from ricepest.states where state_id = :val")
	List<GetDistrictsDTO> getDistrictsByStateIdService(@Param("val") String val);
	
	public static interface GetDistrictsDTO {
		String getDistrict();
		Integer getDistrictId();
	}
	
	
	@Query(nativeQuery = true, value = "SELECT cast(ST_Extent(geom) as varchar) as extent FROM ricepest.state where state = :val") 
	List<GetExtent> getExtentByStateIdService(@Param("val") String val);
	  
	@Query(nativeQuery = true, value = "SELECT cast(ST_Extent(geom) as varchar) as extent FROM ricepest.district where state = :state_val AND dist = :dist_val") 
	List<GetExtent> getExtentByStateIdService(@Param("state_val") String state_val, @Param("dist_val") String dist_val);
	  
	public static interface GetExtent { 
		String getExtent(); 
	}
	 		
	@Query(nativeQuery = true, value = "SELECT ST_AsGeoJSON(t1.*) as extent FROM ricepest.state t1 where state = :val") 
	List<GetFeature> getFeatureByStateIdService(@Param("val") String val);
		  
	@Query(nativeQuery = true, value = "SELECT ST_AsGeoJSON(t1.*) as extent FROM ricepest.district t1 where state = :state_val AND dist = :dist_val") 
	List<GetFeature> getFeatureByStateIdService(@Param("state_val") String state_val, @Param("dist_val") String dist_val);
		  
	public static interface GetFeature { 
		String getExtent(); 
	}
		 
	
}
