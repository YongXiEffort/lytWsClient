package com.lyt.wsclient.dao;

import com.lyt.wsclient.domain.User;
import com.lyt.wsclient.model.chat.FriUserListModel;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.JdbcType;

import java.util.List;

@Mapper
public interface UserMapper {

    @Select("SELECT id,user_name,password,img_path FROM user WHERE user_name = #{userName}")
    @Results({
            @Result(column="id", property="id", jdbcType= JdbcType.VARCHAR, id=true),
            @Result(column="user_name", property="userName", jdbcType=JdbcType.VARCHAR),
            @Result(column="password", property="password", jdbcType=JdbcType.VARCHAR),
            @Result(column="img_path", property="imgPath", jdbcType=JdbcType.VARCHAR),
    })
    User findByName(@Param("userName") String userName);

    @Insert("INSERT INTO user(id, user_name, password) VALUES(#{id}, #{userName}, #{password})")
    int insert(@Param("id") String id, @Param("userName") String userName, @Param("password") String password);

    /**
     * 获取某个用户的好友列表
     * @return
     */
    @Select("SELECT u.id, u.user_name, ur.not_receptMsg_count, cs.content " +
            " FROM user u, user_relation ur, chat_single cs " +
            " WHERE u.id = ur.fri_user_id " +
            " AND ur.last_chat_id = cs.id " +
            " AND ur.user_id = #{userId} " +
            " ORDER BY cs.send_time DESC ")
    @Results({
            @Result(column="id", property="friUserId", jdbcType= JdbcType.VARCHAR, id=true),
            @Result(column="user_name", property="friUserName", jdbcType=JdbcType.VARCHAR),
            @Result(column="not_receptMsg_count", property="notReceptMsgCount", jdbcType=JdbcType.INTEGER),
            @Result(column="content", property="content", jdbcType=JdbcType.VARCHAR),
    })
    List<FriUserListModel> findFirUserAroundUser(@Param("userId") String userId);

    @Select("SELECT id,user_name FROM user WHERE id = #{userId}")
    @Results({
            @Result(column="id", property="id", jdbcType= JdbcType.VARCHAR, id=true),
            @Result(column="user_name", property="userName", jdbcType=JdbcType.VARCHAR)
    })
    User findByUserId(@Param("userId") String userId);

}
