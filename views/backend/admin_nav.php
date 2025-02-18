<style type="text/css">
    .subsubsub li+li:before {content:'| ';}
</style>
<ul class="subsubsub">
    <?php foreach($submenus as $menu): ?>
        <li><a href="<?php echo $menu['link']; ?>" target="<?php echo $menu['target']; ?>" <?php echo ($menu['current']) ? 'class="current"' : ''; ?>><?php echo $menu['title']; ?></a></li>
    <?php endforeach; ?>
</ul>
<!--
<div class="show_hide_pro_options" style="position:absolute; right:20px; margin-top:8px;">
	<input onclick="jQuery('.onlyinpro,.onlyinprov').toggleClass('hide'); return false;" type="button" name="" value="Show/hide Pro options" class="button" />
</div>
-->
<br class="clear" />
</span>