<template>
    <node-view-wrapper class="vue-component">
        <div class="content">
            <v-img :src="node.attrs.img" contain></v-img>
        <!-- <button @click="increase">
            This button has been clicked {{ node.attrs.count }} times.
        </button> -->
        </div>
    </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2'

export default {
    components: {
        NodeViewWrapper,
    },

    props: nodeViewProps,
}
</script>