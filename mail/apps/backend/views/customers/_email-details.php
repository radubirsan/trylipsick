<?php defined('MW_PATH') || exit('No direct script access allowed');

/**
 * This file is part of the MailWizz EMA application.
 * 
 * @package MailWizz EMA
 * @author Serban George Cristian <cristian.serban@mailwizz.com> 
 * @link https://www.mailwizz.com/
 * @copyright 2013-2018 MailWizz EMA (https://www.mailwizz.com)
 * @license https://www.mailwizz.com/license/
 * @since 1.5.2
 */
 
?>

<!-- START CONTENT -->
<?php echo Yii::t('customers', 'Your account details on {site} changed as follow:', array('{site}' => Yii::app()->options->get('system.common.site_name')));?><br />
<?php $url = Yii::app()->apps->getAppUrl('customer', 'guest/index', true);?>

<?php echo Yii::t('customers', 'Url: {url}', array('{url}' =>  CHtml::link($url, $url)));?><br />
<?php echo Yii::t('customers', 'Email: {email}', array('{email}' => $customer->email));?><br />
<?php echo Yii::t('customers', 'Password: {password}', array('{password}' => $customer->fake_password));?><br />

<br />
<?php echo Yii::t('customers', 'If for some reason you cannot click the above url, please paste this one into your browser address bar:')?><br />
<?php echo $url;?>
<!-- END CONTENT-->