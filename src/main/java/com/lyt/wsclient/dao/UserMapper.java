package com.lyt.wsclient.dao;

import com.lyt.wsclient.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

    @Select("SELECT * FROM user WHERE user_name = #{userName}")
    User findByName(@Param("userName") String userName);

    @Insert("INSERT INTO user(id, user_name, password) VALUES(#{id}, #{userName}, #{password})")
    int insert(@Param("id") String id, @Param("userName") String userName, @Param("password") String password);

}
