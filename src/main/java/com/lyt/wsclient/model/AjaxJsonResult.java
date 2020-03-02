/**
 * Created By: Comwave Project Team Created Date: 2013-5-29
 */
package com.lyt.wsclient.model;

import java.io.Serializable;
import java.util.Map;


/**
 * The Class AjaxJsonResult.
 *
 * @author Geln Yang
 * @version 1.0
 */
public class AjaxJsonResult implements Serializable {

	/**
	 * The Constant serialVersionUID.
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 是否成功.
	 */
	private boolean success;

	/**
	 * 返回消息.
	 */
	private String message;

	private Long createTime;

	/**
	 * The id.
	 */
	private String id;

	private Map data;

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	/**
	 * Instantiates a new ajax json result.
	 */
	public AjaxJsonResult() {}

	/**
	 * Instantiates a new ajax json result.
	 *
	 * @param success the success
	 * @param message the message
	 */
	public AjaxJsonResult(boolean success, String message) {
		this.success = success;
		this.message = message;
	}

	public AjaxJsonResult(boolean success, String message, Long createTime) {
		this.success = success;
		this.message = message;
		this.createTime = createTime;
	}

	public Long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}

	public Map getData() {
		return data;
	}

	public void setData(Map data) {
		this.data = data;
	}

}
