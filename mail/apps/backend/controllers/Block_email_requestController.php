<?php defined('MW_PATH') || exit('No direct script access allowed');

/**
 * Block_email_requestController
 *
 * Handles the actions for block email requests related tasks
 *
 * @package MailWizz EMA
 * @author Serban George Cristian <cristian.serban@mailwizz.com>
 * @link https://www.mailwizz.com/
 * @copyright 2013-2018 MailWizz EMA (https://www.mailwizz.com)
 * @license https://www.mailwizz.com/license/
 * @since 1.3.6.9
 */

class Block_email_requestController extends Controller
{
    /**
     * Define the filters for various controller actions
     * Merge the filters with the ones from parent implementation
     */
    public function filters()
    {
        $filters = array(
            'postOnly + delete',
        );

        return CMap::mergeArray($filters, parent::filters());
    }

    /**
     * List all block email requests
     */
    public function actionIndex()
    {
        $request = Yii::app()->request;
        $model   = new BlockEmailRequest('search');
        $model->unsetAttributes();

        // for filters.
        $model->attributes = (array)$request->getQuery($model->modelName, array());

        $this->setData(array(
            'pageMetaTitle'   => $this->data->pageMetaTitle . ' | '. Yii::t('email_blacklist', 'Block email requests'),
            'pageHeading'     => Yii::t('email_blacklist', 'Block email requests'),
            'pageBreadcrumbs' => array(
                Yii::t('email_blacklist', 'Block email requests') => $this->createUrl('block_email_request/index'),
                Yii::t('app', 'View all')
            )
        ));

        $this->render('list', compact('model'));
    }

    /**
     * Confirm a block email request.
     */
    public function actionConfirm($id)
    {
        $model = BlockEmailRequest::model()->findByPk((int)$id);

        if (empty($model)) {
            throw new CHttpException(404, Yii::t('app', 'The requested page does not exist.'));
        }
        
        $model->block();
        
        $request = Yii::app()->request;
        $notify  = Yii::app()->notify;

        $redirect = null;
        if (!$request->getQuery('ajax')) {
            $notify->addSuccess(Yii::t('email_blacklist', 'The request has been successfully confirmed!'));
            $redirect = $request->getPost('returnUrl', array('block_email_request/index'));
        }

        // since 1.3.5.9
        Yii::app()->hooks->doAction('controller_action_delete_data', $collection = new CAttributeCollection(array(
            'controller' => $this,
            'model'      => $model,
            'redirect'   => $redirect,
        )));
        
        if ($collection->redirect) {
            $this->redirect($collection->redirect);
        }
    }

    /**
     * Delete a block email request.
     */
    public function actionDelete($id)
    {
        $model = BlockEmailRequest::model()->findByPk((int)$id);

        if (empty($model)) {
            throw new CHttpException(404, Yii::t('app', 'The requested page does not exist.'));
        }

        $model->delete();

        $request = Yii::app()->request;
        $notify  = Yii::app()->notify;

        $redirect = null;
        if (!$request->getQuery('ajax')) {
            $notify->addSuccess(Yii::t('app', 'The item has been successfully deleted!'));
            $redirect = $request->getPost('returnUrl', array('block_email_request/index'));
        }

        // since 1.3.5.9
        Yii::app()->hooks->doAction('controller_action_delete_data', $collection = new CAttributeCollection(array(
            'controller' => $this,
            'model'      => $model,
            'redirect'   => $redirect,
        )));

        if ($collection->redirect) {
            $this->redirect($collection->redirect);
        }
    }
}
